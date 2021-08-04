import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: "name is required",
    },
    username: {
      type: String,
      required: "username is required",
    },
    email: {
      type: String,
      required: "name is required",
    },
    password: {
      type: String,
      required: "name is required",
    },
    team: {
      type: ObjectId,
      ref: "Team",
    },
    kind: {
      type: [String],
      default: [],
      required: false,
    },
  },
  { timestamps: true }
);

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  // @todo relate with ITeam interface
  team: string;
  kind: string[];
  authenticate: (plainTextPassword: string) => boolean;
  encryptPassword: (password: string | undefined) => string;
  createdAt: Date;
  updatedAt: Date;
}

UserSchema.methods = {
  authenticate(plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  encryptPassword(password) {
    return bcrypt.hashSync(password, 8);
  },
};

export default mongoose.model("User", UserSchema);
