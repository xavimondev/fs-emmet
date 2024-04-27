import React from "react";
import { Composition } from "remotion";

export function Showcase () {
  return (
    <>
      <Composition
        id="Empty"
        component={() => <h1 className="text-green-400 text-3xl">What's going on</h1>}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};