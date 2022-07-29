import * as yup from "yup";


export const basicSchema = yup.object().shape({

    nickname: yup
    .string()
    .min(3, "nickname must be at least 3 characters long")
    .required("Required"),
    real_name: yup
    .string()
    .min(3, "real_name must be at least 3 characters long")
    .required("Required"),
    origin_description: yup
    .string()
    .min(3, "origin_description must be at least 3 characters long")
    .required("Required"),
    superpowers: yup
    .string()
    .min(3, "superpowers must be at least 3 characters long")
    .required("Required"),
    catch_phrase: yup
    .string()
    .min(3, "catch_phrase must be at least 3 characters long")
    .required("Required"),
 
});