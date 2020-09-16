import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import ListProviderService from "./ListProvidersService";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService;
let fakeCacheProvider: FakeCacheProvider;

describe("ListProviders", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProviderService(
      fakeUsersRepository,
      fakeCacheProvider
    );
  });
  it("should be able to list the providers", async () => {
    const user1 = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@exemple.com",
      password: "123456",
    });

    const user2 = await fakeUsersRepository.create({
      name: "John Trê",
      email: "johntre@exemple.com",
      password: "123456",
    });

    const loggedUser = await fakeUsersRepository.create({
      name: "John Qua",
      email: "johnqua@exemple.com",
      password: "123456",
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toStrictEqual([user1, user2]);
  });
});
