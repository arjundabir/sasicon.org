import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => (
      <h1
        className="text-3xl font-bold mb-4 sticky inset-0 z-1 bg-white py-1 rounded border-b"
        {...props}
      />
    ),
    h2: (props) => <h2 className="text-2xl font-bold mb-2" {...props} />,
    p: (props) => <p className="mb-4" {...props} />,
    ul: (props) => (
      <ul className="list-disc list-inside mb-4 pl-8" {...props} />
    ),
    ol: (props) => (
      <ol className="list-decimal list-inside mb-4 pl-8" {...props} />
    ),
    li: (props) => <li className="mb-2" {...props} />,
  };
}
