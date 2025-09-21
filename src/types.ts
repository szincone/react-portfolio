import { Theme } from '@material-ui/core/styles';

export interface Person {
  name: string;
  skill: string;
  email: string;
}

export interface Urls {
  github: string;
  linkedin: string;
  email: string;
}

export interface StylesFunction {
  (theme: Theme): Record<string, any>;
}

export interface AppProps {
  classes: Record<string, string>;
}

export interface RoutesProps {
  person: Person;
  urls: Urls;
  classes: Record<string, string>;
}

export interface HomePageProps {
  classes: Record<string, string>;
  person: Person;
}

export interface AboutPageProps {
  classes: Record<string, string>;
}

export interface ButtonLinksProps {
  classes: Record<string, string>;
  urls: Urls;
}