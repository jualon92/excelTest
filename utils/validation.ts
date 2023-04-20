
import * as yup from 'yup';


export const PersonaSchemaValidation = yup.object().shape({
    id: yup.mixed(),
    first_name:  yup.string().required(),
    last_name: yup.string().required(),
    amount: yup.number().positive().required(),
    __rowNum__: yup.number(),
});

 
export const  PersonasSchemaValidation = yup.array().of(PersonaSchemaValidation);