import ICredentials from "../interfaces/ICredentials";
import { CredentialModel } from "../config/AppdataSource";
import CredentialDto from "../interfaces/dto/credentialDto";
import { Credentials } from "../entities/CredentialsE";

const dataBaseCredentials: ICredentials[] = [];
let id = 1;

export const createCredentialsService = async (
  credential: CredentialDto
): Promise<Credentials> => {
  const newCredential = CredentialModel.create(credential);
  const savedCredential = await CredentialModel.save(newCredential);

  return savedCredential;
};

export const checkCredentialsService = async (
  username: string,
  password: string
): Promise<number | null> => {
  const credential = await CredentialModel.findOne({
    where: { username },
  });

  if (!credential) {
    return null;
  }
  if (
    credential &&
    credential.password === password &&
    credential.username === username
  ) {
    return credential.id;
  }
  return null;
};
