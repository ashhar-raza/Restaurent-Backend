import { CustomerPayLoad } from "./Customer.dto";
import { VendorTokenPayload } from "./Vendor.dto";

export type AuthTypePayload = VendorTokenPayload | CustomerPayLoad;