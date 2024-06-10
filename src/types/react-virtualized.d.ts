import { ListProps, AutoSizerProps } from "../types";

declare module "react-virtualized" {
  import * as React from "react";

  export class List extends React.Component<ListProps> {}
  export class AutoSizer extends React.Component<AutoSizerProps> {}
}
