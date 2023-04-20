export interface Persona {
    id:         number;
    first_name: string;
    last_name:  string;
    amount:     number;
}

export interface IEnqueueOptions {
    msg: string;
    variant: 'default' | 'error' | 'success' | 'warning' | 'info';
  }
  