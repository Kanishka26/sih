'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Camera, Loader2, RefreshCw, Send, Sparkles } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Image from 'next/image';
import { analyzeFoodImageAction } from '@/lib/actions';
import { type AnalyzeFoodImageOutput } from '@/ai/flows/analyze-food-image';
import { Badge } from '@/components/ui/badge';

export default function NutriScanPage() {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<AnalyzeFoodImageOutput | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast({
          variant: 'destructive',
          title: 'Camera Not Supported',
          description: 'Your browser does not support camera access.',
        });
        setHasCameraPermission(false);
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description:
            'Please enable camera permissions in your browser settings.',
        });
      }
    };

    if (!capturedImage) {
        getCameraPermission();
    }
  
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast, capturedImage]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUri = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUri);
        setResult(null);
         if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
         }
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setResult(null);
  };

  const handleAnalyze = () => {
    if (!capturedImage) return;
    startTransition(async () => {
      try {
        const res = await analyzeFoodImageAction({ photoDataUri: capturedImage });
        setResult(res);
      } catch (error) {
        toast({
          title: 'Analysis Failed',
          description: 'Could not analyze the image. Please try again.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">NutriScan (पोषण स्कैन)</h1>
        <p className="text-muted-foreground">
          Capture an image of your meal to get instant nutritional analysis.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="aspect-video w-full bg-muted rounded-md flex items-center justify-center overflow-hidden relative">
            {!capturedImage && (
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            )}
             {hasCameraPermission === false && (
                <div className="text-center p-4">
                    <Camera className="w-12 h-12 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">Camera access is required to scan your food.</p>
                </div>
             )}
            {capturedImage && (
              <Image
                src={capturedImage}
                alt="Captured food"
                fill
                className="object-cover"
              />
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          {!capturedImage ? (
            <Button onClick={handleCapture} disabled={!hasCameraPermission}>
              <Camera className="mr-2" />
              Capture Image
            </Button>
          ) : (
            <>
              <Button onClick={handleRetake} variant="outline">
                <RefreshCw className="mr-2" />
                Retake
              </Button>
              <Button onClick={handleAnalyze} disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
                Analyze Meal
              </Button>
            </>
          )}
        </CardFooter>
      </Card>

      {isPending && (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center space-y-4 min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">
              Our AI is analyzing your delicious meal...
            </p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results for: {result.dishName}</CardTitle>
            <CardDescription>
              Here's the nutritional and Ayurvedic breakdown of your meal.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Calories</p>
                    <p className="text-2xl font-bold text-primary">{result.calories}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Protein</p>
                    <p className="text-2xl font-bold text-primary">{result.protein}g</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Carbs</p>
                    <p className="text-2xl font-bold text-primary">{result.carbs}g</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Fat</p>
                    <p className="text-2xl font-bold text-primary">{result.fat}g</p>
                </div>
             </div>

             <div>
                <h4 className="font-semibold mb-2">Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                    {result.ingredients.map(ing => (
                        <Badge key={ing} variant="secondary">{ing}</Badge>
                    ))}
                </div>
             </div>

             <div>
                <h4 className="font-semibold mb-2">Ayurvedic Perspective</h4>
                <p className="text-sm text-muted-foreground">{result.ayurvedicPerspective}</p>
             </div>

          </CardContent>
        </Card>
      )}
    </div>
  );
}
