import { ClientReposityMock } from "../../repositories/mock/ClientReposityMock";
import { ClientService } from "../services/ClientService";

type IMakeSut = {
  clientServiceSUT: ClientService;
  clientMockRepo: ClientReposityMock;
};

describe("Cliente Module", () => {
  const makeSut = (): IMakeSut => {
    const clientMockRepo = new ClientReposityMock();
    const clientServiceSUT = new ClientService(clientMockRepo);

    return {
      clientMockRepo,
      clientServiceSUT,
    };
  };

  it("Should be able to create a new Client", async () => {
    const { clientServiceSUT } = makeSut();

    const clientData = {
      name: "Jean",
      email: "jean@gmail.com",
      password: "1234",
    };
    const client = await clientServiceSUT.newClient(clientData);

    expect(client).toHaveProperty("id");
  });

  it("Should be able to create an Admin", async () => {
    const { clientServiceSUT } = makeSut();

    const clientData = {
      name: "Jean",
      email: "jean@gmail.com",
      password: "1234",
    };

    const client = await clientServiceSUT.newAdminClient(clientData);
    expect(client).toHaveProperty("id");
    expect(client.role).toBe("admin");
  });

  it("Should be able to get a client by ID", async () => {
    const { clientServiceSUT } = makeSut();

    const clientData = {
      name: "Jean",
      email: "jean@gmail.com",
      password: "1234",
    };
    const { id } = await clientServiceSUT.newAdminClient(clientData);

    const client = await clientServiceSUT.getClientById(id);

    expect(client).toHaveProperty("id");
    expect(client.email).toBe(clientData.email);
  });

  it("Should be able to get a client by E-mail", async () => {
    const { clientServiceSUT } = makeSut();

    const clientData = {
      name: "Jean",
      email: "jean@gmail.com",
      password: "1234",
    };
    const { email } = await clientServiceSUT.newAdminClient(clientData);

    const client = await clientServiceSUT.getClientByEmail(email);

    expect(client.email).toEqual(clientData.email);
  });
});
