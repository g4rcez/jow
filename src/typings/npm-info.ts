export namespace Npm {
  export interface Show {
    _id: string;
    _rev: string;
    name: string;
    description: string;
    "dist-tags": DistTags;
    versions: string[];
    maintainers: string[];
    time: { [key: string]: string };
    repository: Repository;
    readmeFilename: string;
    homepage: string;
    keywords: string[];
    bugs: Bugs;
    users: { [key: string]: boolean };
    license: string;
    _cached: boolean;
    _contentLength: number;
    version: string;
    main: string;
    engines: Engines;
    dependencies: Dependencies;
    browserify: Browserify;
    _nodeVersion: string;
    _npmVersion: string;
    dist: Dist;
    _npmUser: string;
    directories: Directories;
    _npmOperationalInternal: NpmOperationalInternal;
    _hasShrinkwrap: boolean;
  }

  export interface NpmOperationalInternal {
    host: string;
    tmp: string;
  }

  export interface Browserify {
    transform: string[];
  }

  export interface Bugs {
    url: string;
  }

  export interface Dependencies {
    "loose-envify": string;
    "object-assign": string;
  }

  export interface Directories {}

  export interface Dist {
    integrity: string;
    shasum: string;
    tarball: string;
    fileCount: number;
    unpackedSize: number;
    "npm-signature": string;
  }

  export interface DistTags {
    latest: string;
    next: string;
    experimental: string;
    untagged: string;
  }

  export interface Engines {
    node: string;
  }

  export interface Repository {
    type: string;
    url: string;
    directory: string;
  }
}
