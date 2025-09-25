
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
import { Camera, Loader2, RefreshCw, Sparkles, Upload } from 'lucide-react';
import Image from 'next/image';
import { type AnalyzeFoodImageOutput } from '@/ai/flows/analyze-food-image';
import { Badge } from '@/components/ui/badge';
import { analyzeFoodImageAction } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function NutriScanPage() {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<AnalyzeFoodImageOutput | null>(null);

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
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };

    getCameraPermission();
  
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const dataUri = canvas.toDataURL('image/png');
      setCapturedImage(dataUri);
      setResult(null);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
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
          Capture or upload an image of your meal to get instant nutritional analysis.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="aspect-video w-full bg-muted rounded-md flex items-center justify-center overflow-hidden relative">
            {capturedImage ? (
              <Image
                src={capturedImage}
                alt="Captured food"
                fill
                className="object-cover"
              />
            ) : (
              <>
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                {hasCameraPermission === false && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/80 p-4">
                        <Alert variant="destructive" className="max-w-md">
                          <Camera className="h-4 w-4"/>
                          <AlertTitle>Camera Access Denied</AlertTitle>
                          <AlertDescription>
                            Please enable camera permissions in your browser settings to use this feature, or upload a file instead.
                          </AlertDescription>
                        </Alert>
                    </div>
                )}
              </>
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <Input 
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          {!capturedImage ? (
            <>
              <Button onClick={handleCapture} disabled={hasCameraPermission !== true}>
                <Camera className="mr-2" />
                Capture Image
              </Button>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2" />
                Upload Image
              </Button>
            </>
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
