"use client";

import { Loader2, CheckCircle2, FileCode2, FilePen, Eye, Wrench } from "lucide-react";
import type { ToolInvocation } from "ai";

interface ToolInvocationCardProps {
  tool: ToolInvocation;
}

interface ToolMeta {
  label: (args: Record<string, unknown>) => string;
  icon: React.ComponentType<{ className?: string }>;
}

const TOOL_META: Record<string, ToolMeta> = {
  str_replace_editor: {
    icon: FilePen,
    label: (args) => {
      const command = args?.command as string | undefined;
      const path = args?.path as string | undefined;
      const filename = path ? path.split("/").pop() : undefined;

      if (command === "create" || command === "write" || args?.file_text) {
        return filename ? `Creating ${filename}` : "Creating component file";
      }
      if (command === "str_replace" || (args?.old_str !== undefined)) {
        return filename ? `Editing ${filename}` : "Editing component file";
      }
      if (command === "view") {
        return filename ? `Reading ${filename}` : "Reading file";
      }
      return filename ? `Writing ${filename}` : "Writing component file";
    },
  },
  read_file: {
    icon: Eye,
    label: (args) => {
      const path = args?.path as string | undefined;
      const filename = path ? path.split("/").pop() : undefined;
      return filename ? `Reading ${filename}` : "Reading file";
    },
  },
  write_file: {
    icon: FileCode2,
    label: (args) => {
      const path = args?.path as string | undefined;
      const filename = path ? path.split("/").pop() : undefined;
      return filename ? `Writing ${filename}` : "Writing file";
    },
  },
};

function getFriendlyMeta(tool: ToolInvocation): { label: string; icon: React.ComponentType<{ className?: string }> } {
  const meta = TOOL_META[tool.toolName];
  if (meta) {
    return {
      label: meta.label(tool.args as Record<string, unknown>),
      icon: meta.icon,
    };
  }
  return {
    label: tool.toolName.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    icon: Wrench,
  };
}

export function ToolInvocationCard({ tool }: ToolInvocationCardProps) {
  const isDone = tool.state === "result";
  const { label, icon: Icon } = getFriendlyMeta(tool);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-medium border border-neutral-200">
      {isDone ? (
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
      ) : (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600 flex-shrink-0" />
      )}
      <Icon className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
      <span className="text-neutral-700">{label}</span>
    </div>
  );
}
