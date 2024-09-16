import { InformationMessage } from './message.model';
import { MediaSource } from './source.model';

export interface Media {
  title: string;
  subtitle: string;
  mainDescription: string;
  accessDescription: string;
  informationMessage: InformationMessage;
  authors: Array<string>;
  sources: Array<MediaSource>;
  enabled: boolean;
}
