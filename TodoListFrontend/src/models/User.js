export const UserType = Object.freeze({
    ADMIN: 'ADMIN',
    NORMAL: 'NORMAL',
});

export class User {
    constructor(name, email, type, score){
        this.name = name;
        this.email = email;
        this.type = type;
        this.score = score;
    }
}