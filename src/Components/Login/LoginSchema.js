
import * as Yup from 'yup';

export const LoginSchema=Yup.object().shape({
    password:Yup.string().matches(/(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/,"Password must include  lowercase, digit, special character, and be at least 5 characters long").required("password should not be blank"),
    username:Yup.string().matches(/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/, "please enter the valid username"
    ).required("This field is required")
})