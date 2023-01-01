import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'user', timestamps: true } })
class User {
  @prop({ type: String, required: true, unique: true })
  public email: string | undefined;

  @prop({ type: String, required: true })
  public password: string | undefined;

  public createdAt?: Date;

  public updatedAt?: Date;
}

const UserModel = getModelForClass(User);

export default UserModel;
