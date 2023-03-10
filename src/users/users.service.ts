import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(private readonly configService: ConfigService) {
    this.users = [
      {
        id: this.configService.get<number>('USER_ID'),
        name: this.configService.get<string>('USER_NAME'),
        email: this.configService.get<string>('USER_EMAIL'),
        password: this.configService.get<string>('USER_PASSWORD'),
      },
      // Agrega aquí los demás usuarios definidos en variables de entorno o desde alguna otra fuente de datos.
    ];
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
