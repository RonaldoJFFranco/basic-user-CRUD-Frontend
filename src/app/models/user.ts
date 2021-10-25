export interface User {
    cod: number;
    name: string;
    birthday: string;
    photo: string;
    photoName: string;
    photoType: string;
    photoPath?: string;
    photoFile?: File;
}