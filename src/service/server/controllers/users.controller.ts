import {UsersService} from "../data-access/services/users.service";

export class UsersController {
  constructor(private usersService: UsersService) {}
}
