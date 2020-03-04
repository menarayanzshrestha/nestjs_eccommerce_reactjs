export interface loginDTO{
    username: string;
    password: string;
}
export interface RegisterDTO {
    username: string;
    password: string;
    seller?: boolean;
}