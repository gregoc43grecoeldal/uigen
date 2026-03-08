import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationCard } from "../ToolInvocationCard";
import type { ToolInvocation } from "ai";

afterEach(() => {
  cleanup();
});

// --- str_replace_editor ---

test("shows 'Creating component file' for str_replace_editor with file_text arg", () => {
  const tool: ToolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: { file_text: "export function Foo() {}" },
    state: "result",
    result: "ok",
  };
  render(<ToolInvocationCard tool={tool} />);
  expect(screen.getByText("Creating component file")).toBeDefined();
});

test("shows filename when path is provided for str_replace_editor create", () => {
  const tool: ToolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: { command: "create", path: "src/components/Button.tsx", file_text: "" },
    state: "result",
    result: "ok",
  };
  render(<ToolInvocationCard tool={tool} />);
  expect(screen.getByText("Creating Button.tsx")).toBeDefined();
});

test("shows 'Editing <filename>' for str_replace_editor str_replace command", () => {
  const tool: ToolInvocation = {
    toolCallId: "2",
    toolName: "str_replace_editor",
    args: { command: "str_replace", path: "src/components/Card.tsx", old_str: "foo", new_str: "bar" },
    state: "result",
    result: "ok",
  };
  render(<ToolInvocationCard tool={tool} />);
  expect(screen.getByText("Editing Card.tsx")).toBeDefined();
});

test("shows 'Reading <filename>' for str_replace_editor view command", () => {
  const tool: ToolInvocation = {
    toolCallId: "3",
    toolName: "str_replace_editor",
    args: { command: "view", path: "src/components/Header.tsx" },
    state: "result",
    result: "ok",
  };
  render(<ToolInvocationCard tool={tool} />);
  expect(screen.getByText("Reading Header.tsx")).toBeDefined();
});

test("shows 'Writing component file' for str_replace_editor with no recognized command", () => {
  const tool: ToolInvocation = {
    toolCallId: "4",
    toolName: "str_replace_editor",
    args: {},
    state: "call",
  };
  render(<ToolInvocationCard tool={tool} />);
  expect(screen.getByText("Writing component file")).toBeDefined();
});

// --- read_file / write_file ---

test("shows 'Reading <filename>' for read_file tool", () => {
  const tool: ToolInvocation = {
    toolCallId: "5",
    toolName: "read_file",
    args: { path: "src/utils/helpers.ts" },
    state: "result",
    result: "content",
  };
  render(<ToolInvocationCard tool={tool} />);
  expect(screen.getByText("Reading helpers.ts")).toBeDefined();
});

test("shows 'Writing <filename>' for write_file tool", () => {
  const tool: ToolInvocation = {
    toolCallId: "6",
    toolName: "write_file",
    args: { path: "src/components/Badge.tsx" },
    state: "result",
    result: "ok",
  };
  render(<ToolInvocationCard tool={tool} />);
  expect(screen.getByText("Writing Badge.tsx")).toBeDefined();
});

// --- Unknown tools ---

test("formats unknown tool names in title case with spaces", () => {
  const tool: ToolInvocation = {
    toolCallId: "7",
    toolName: "run_tests",
    args: {},
    state: "result",
    result: "passed",
  };
  render(<ToolInvocationCard tool={tool} />);
  expect(screen.getByText("Run Tests")).toBeDefined();
});

// --- State indicators ---

test("shows spinner when tool is in-progress (state: call)", () => {
  const tool: ToolInvocation = {
    toolCallId: "8",
    toolName: "str_replace_editor",
    args: {},
    state: "call",
  };
  const { container } = render(<ToolInvocationCard tool={tool} />);
  expect(container.querySelector(".animate-spin")).toBeTruthy();
});

test("shows check icon when tool is done (state: result)", () => {
  const tool: ToolInvocation = {
    toolCallId: "9",
    toolName: "str_replace_editor",
    args: {},
    state: "result",
    result: "ok",
  };
  const { container } = render(<ToolInvocationCard tool={tool} />);
  expect(container.querySelector(".animate-spin")).toBeNull();
  // CheckCircle2 renders an svg; verify the spinner is gone and something is rendered
  expect(container.querySelector("svg")).toBeTruthy();
});
