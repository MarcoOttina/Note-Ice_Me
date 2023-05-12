/**
 * Abstract node of the note-tree.
 */
export type NoteNodeAbstract = {
  father?: NoteNodeAbstract;

  /** must be non-negative */
  depthLevel: number = 0;
};

/**
 * Enumeration of available, defined types.
 */
export enum TerminalTypes {
  Text = 'text',
  Uri = 'uri',
  File = 'file',
}

/**
 * Terminal node, may consists of a simple text or resource.
 */
export type TerminalNode = NoteNodeAbstract & {
  type: TerminalTypes;
};

/**
 * Utility type used just to define a non-abstract node
 */
export type ConcreteNode = SubInternalNode | TerminalNode;

/**
 * Plain text.
 */
export type TextNode = TerminalNode & {
  text: string;
};

/**
 * Just an URI.
 * It's similar to a text node but can be used to specifically render.
 * some link preview.
 */
export type LinkNode = TerminalNode & {
  uri: string;
};

/**
 * Any kind of file: textual, image, video, audio, etc.
 */
export type FileNode = TerminalNode & {
  /**
   * Identifier of the file stored inside a storage (folder, database, etc).
   */
  fileID: string;
};

/**
 * An internal node on the tree, listing other nodes of the same single level.
 */
export type SubInternalNode = NoteNodeAbstract & {
  subparts?: ConcreteNode[];
};

type NoteGeneral = {
  mainText: string;
  notesRoot?: ConcreteNode;
  comments?: string;
};

export default NoteGeneral;
