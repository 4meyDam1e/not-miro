"use client";

import { memo } from "react";
import { colorToCss } from "@/lib/utils";

import { LayerType } from "@/types/canvas";
import { useStorage } from "@/liveblocks.config";
import { Text } from "./text";
import { StickyNote } from "./sticky-note";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";
import { Path } from "./path";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

export const LayerPreview = memo(({
  id,
  onLayerPointerDown,
  selectionColor,
}: LayerPreviewProps) => {
  const layer = useStorage((root) => root.layers.get(id));

  if (!layer) {
    return null;
  }

  switch (layer.type) {
    case LayerType.Text:
      return (
        <Text
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Note:
      return (
        <StickyNote
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Rectangle:
      return (
        <Rectangle
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Ellipse:
      return (
        <Ellipse
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Path:
      return (
        <Path
          key={id}
          x={layer.x}
          y={layer.y}
          points={layer.points}
          fill={layer.fill ? colorToCss(layer.fill) : "#000"}
          onPointerDown={(e) => onLayerPointerDown(e, id)}
          stroke={selectionColor}
        />
      );
    default:
      console.warn("Unknown layer type");
      return null;
  }
});

LayerPreview.displayName = "LayerPreview";