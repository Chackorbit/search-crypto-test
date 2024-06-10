export interface CryptoPair {
  id: number;
  symbol: string;
  name: string;
}

export interface ListRowProps {
  index: number;
  key: string;
  style: React.CSSProperties;
}

export interface ListProps {
  width: number;
  height: number;
  rowCount: number;
  rowHeight: number;
  rowRenderer: (props: ListRowProps) => React.ReactNode;
}

export interface AutoSizerProps {
  children: (props: { width: number; height: number }) => React.ReactNode;
  disableHeight?: boolean;
  disableWidth?: boolean;
}
