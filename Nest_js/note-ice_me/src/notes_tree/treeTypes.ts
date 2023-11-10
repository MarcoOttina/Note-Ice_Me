export type IDProvider = () => string;
export function resolveID(id: string | IDProvider): string {
  return typeof id === 'string' ? (id as string) : (id as IDProvider)();
}

/**
 * Abstract node of the note-tree.
 */
export abstract class NoteNodeAbstract {
  idTree: string;
  father?: NoteNodeAbstract;
  depthLevel: number; // defaults to 0
  constructor(
    idTree: string | IDProvider,
    father?: NoteNodeAbstract,
    /** must be non-negative */
    depthLevel?: number, // defaults to 0
  ) {
    this.idTree = resolveID(idTree);
    this.depthLevel = depthLevel && depthLevel >= 0 ? depthLevel : 0;
    this.father = father;
  }
}

/**
 * Enumeration of available, defined types.
 */
export enum TerminalTypes {
  PlainText = 'text', // plain text
  Uri = 'uri', // it could include a preview of the linked resource
  File = 'file', // any type, despite the differences in handling and view about audio, video, image, etc
  ProjectReference = 'project', // literally another project, identified by URI and referenced by a local project
  List = 'list', // a bullet-list-like of elements, which are textual right now
}
export function terminalTypeFromName(
  name: string | null,
): TerminalTypes | null {
  if (name == null || name === undefined) {
    return null;
  }
  name = name.trim().toLowerCase();
  let terminalType: TerminalTypes;
  switch (name) {
    case 'uri':
      terminalType = TerminalTypes.Uri;
      break;
    case 'file':
      terminalType = TerminalTypes.File;
      break;
    case 'project':
      terminalType = TerminalTypes.ProjectReference;
      break;
    case 'list':
      terminalType = TerminalTypes.List;
      break;
    case 'text':
    default:
      terminalType = TerminalTypes.PlainText;
  }
  return terminalType;
}

export enum FileTypes {
  Audio = 'audio',
  Image = 'image',
  Video = 'video',
  CodeSrc = 'code',
  BinaryRaw = 'binary',
}

export function fileTypeFromName(name: string | null): FileTypes | null {
  if (name == null || name === undefined) {
    return null;
  }
  name = name.trim().toLowerCase();
  let fileType: FileTypes;
  switch (name) {
    case 'audio':
      fileType = FileTypes.Audio;
      break;
    case 'image':
      fileType = FileTypes.Image;
      break;
    case 'video':
      fileType = FileTypes.Video;
      break;
    case 'code':
      fileType = FileTypes.CodeSrc;
      break;
    case 'binary':
    default:
      fileType = FileTypes.BinaryRaw;
  }
  return fileType;
}

/**
 * Terminal node, may consists of a simple text or resource.
 * Intermediate type just to generalize the "terminal" concept
 */
export abstract class TerminalNodeAbstract extends NoteNodeAbstract {
  type: TerminalTypes;
  constructor(
    type: TerminalTypes,
    idTree: string | IDProvider,
    father?: NoteNodeAbstract,
    depthLevel?: number,
  ) {
    super(idTree, father, depthLevel);
    this.type = type;
  }
}

/**
 * Utility type used just to define a non-abstract node
export type ConcreteNode = SubInternalNode | TerminalNodeAbstract;
*/

/**
 * Plain text.
 */
export class TextNode extends TerminalNodeAbstract {
  text: string;
  constructor(
    text: string,
    idTree: string | IDProvider,
    father?: NoteNodeAbstract,
    depthLevel?: number,
  ) {
    super(TerminalTypes.PlainText, idTree, father, depthLevel);
    this.text = text;
  }
}

/**
 * Just an URI.
 * It's similar to a text node but can be used to specifically render.
 * some link preview.
 */
export class LinkNode extends TerminalNodeAbstract {
  uri: string;
  constructor(
    uri: string,
    idTree: string | IDProvider,
    father?: NoteNodeAbstract,
    depthLevel?: number,
  ) {
    super(TerminalTypes.Uri, idTree, father, depthLevel);
    this.uri = uri;
  }
}

/**
 * Any kind of file: textual, image, video, audio, etc.
 */
export class FileNode extends TerminalNodeAbstract {
  /**
   * Identifier of the file stored inside a storage (folder, database, etc).
   */
  fileID: string;
  subtype: FileTypes;
  constructor(
    fileID: string,
    subtype: FileTypes,
    idTree: string | IDProvider,
    father?: NoteNodeAbstract,
    depthLevel?: number,
  ) {
    super(TerminalTypes.File, idTree, father, depthLevel);
    this.fileID = fileID;
    this.subtype = subtype;
  }
}

export class ProjectReferenceNode extends TerminalNodeAbstract {
  uriProject: string;
  constructor(
    uriProject: string,
    idTree: string | IDProvider,
    father?: NoteNodeAbstract,
    depthLevel?: number,
  ) {
    super(TerminalTypes.ProjectReference, idTree, father, depthLevel);
    this.uriProject = uriProject;
  }
}

export class ListNode extends TerminalNodeAbstract {
  elements: string[];
  constructor(
    idTree: string | IDProvider,
    father?: NoteNodeAbstract,
    depthLevel?: number,
  ) {
    super(TerminalTypes.ProjectReference, idTree, father, depthLevel);
    this.elements = [];
  }
}

/**
 * An internal node on the tree, listing other nodes of the same single level.
 */
export class SubInternalNode implements NoteNodeAbstract {
  idTree: string;
  father?: NoteNodeAbstract;
  depthLevel: number;
  subparts?: NoteNodeAbstract[];
}

/**
 * The actual tree
 */
class NoteTree {
  id: string;
  //mainText: string;
  notesRoot?: NoteNodeAbstract;
  comments: string;
  constructor(idSource: IDProvider) {
    this.id = resolveID(idSource);
    this.notesRoot = null;
    this.comments = '';
  }
  //public addCommentAfter()
}

export default NoteTree;
