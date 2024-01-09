import mongoose from 'mongoose';
interface branchInterface {
  branch_name: string;
  branch_identifier?: string;
  is_active?: boolean;
  is_in_filter?: boolean;
  show_on_dashboard?: boolean;
}

interface BranchDoc extends mongoose.Document {
  branch_name: string;
  branch_identifier?: string;
  is_active?: boolean;
  is_in_filter?: boolean;
  show_on_dashboard?: boolean;
}

interface branchModel extends mongoose.Model<BranchDoc> {
  build(attr: branchInterface): BranchDoc;
}

const branchSchema = new mongoose.Schema(
  {
    branch_name: {
      type: String,
      required: true,
    },
    branch_identifier: {
      type: String,
      required: false,
    },
    is_active: {
      type: Boolean,
      required: false,
      default: true,
    },
    is_in_filter: {
      type: Boolean,
      required: false,
      default: true,
    },
    show_on_dashboard: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
      },
    },
    timestamps: true,
  }
);
branchSchema.statics.build = (attrs: branchInterface) => {
  return new Branch(attrs);
};

const Branch = mongoose.model<BranchDoc, branchModel>('Branch', branchSchema);
export { Branch };
