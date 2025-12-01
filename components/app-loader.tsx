"use client";

import { useEffect, useState } from "react";

export function AppLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        {/* Loading SVG */}
        <div className="w-16 h-16">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width="64" 
            height="64" 
            className="fill-primary"
          >
            <rect width="2.8" height="12" x="1" y="6">
              <animate 
                id="SVGLQdHQe4p" 
                attributeName="y" 
                begin="0;SVGg3vsIeGm.end-0.1s" 
                calcMode="spline" 
                dur="0.6s" 
                keySplines=".36,.61,.3,.98;.36,.61,.3,.98" 
                values="6;1;6"
              />
              <animate 
                attributeName="height" 
                begin="0;SVGg3vsIeGm.end-0.1s" 
                calcMode="spline" 
                dur="0.6s" 
                keySplines=".36,.61,.3,.98;.36,.61,.3,.98" 
                values="12;22;12"
              />
            </rect>
            <rect width="2.8" height="12" x="5.8" y="6">
              <animate 
                attributeName="y" 
                begin="SVGLQdHQe4p.begin+0.1s" 
                calcMode="spline" 
                dur="0.6s" 
                keySplines=".36,.61,.3,.98;.36,.61,.3,.98" 
                values="6;1;6"
              />
              <animate 
                attributeName="height" 
                begin="SVGLQdHQe4p.begin+0.1s" 
                calcMode="spline" 
                dur="0.6s" 
                keySplines=".36,.61,.3,.98;.36,.61,.3,.98" 
                values="12;22;12"
              />
            </rect>
            <rect width="2.8" height="12" x="10.6" y="6">
              <animate 
                attributeName="y" 
                begin="SVGLQdHQe4p.begin+0.2s" 
                calcMode="spline" 
                dur="0.6s" 
                keySplines=".36,.61,.3,.98;.36,.61,.3,.98" 
                values="6;1;6"
              />
              <animate 
                attributeName="height" 
                begin="SVGLQdHQe4p.begin+0.2s" 
                calcMode="spline" 
                dur="0.6s" 
                keySplines=".36,.61,.3,.98;.36,.61,.3,.98" 
                values="12;22;12"
              />
            </rect>
            <rect width="2.8" height="12" x="15.4" y="6">
              <animate 
                attributeName="y" 
                begin="SVGLQdHQe4p.begin+0.3s" 
                calcMode="spline" 
                dur="0.6s" 
                keySplines=".36,.61,.3,.98;.36,.61,.3,.98" 
                values="6;1;6"
              />
              <animate 
                attributeName="height" 
                begin="SVGLQdHQe4p.begin+0.3s" 
                calcMode="spline" 
                dur="0.6s" 
                keySplines=".36,.61,.3,.98;.36,.61,.3,.98" 
                values="12;22;12"
              />
            </rect>
            <rect width="2.8" height="12" x="20.2" y="6">
              <animate 
                id="SVGg3vsIeGm" 
                attributeName="y" 
                begin="SVGLQdHQe4p.begin+0.4s" 
                calcMode="spline" 
                dur="0.6s" 
                keySplines=".36,.61,.3,.98;.36,.61,.3,.98" 
                values="6;1;6"
              />
              <animate 
                attributeName="height" 
                begin="SVGLQdHQe4p.begin+0.4s" 
                calcMode="spline" 
                dur="0.6s" 
                keySplines=".36,.61,.3,.98;.36,.61,.3,.98" 
                values="12;22;12"
              />
            </rect>
          </svg>
        </div>
        
        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">NEXA AI</h2>
          <p className="text-muted-foreground text-sm">Loading your AI assistant...</p>
        </div>
      </div>
    </div>
  );
}

export function AppLoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AppLoader />;
  }

  return <>{children}</>;
}