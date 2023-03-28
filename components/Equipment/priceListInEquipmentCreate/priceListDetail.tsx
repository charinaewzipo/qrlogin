import React from "react";
import { useFieldArray } from "react-hook-form";

// import Input from "./components/input";
import { RHFSelect, RHFTextField } from '@sentry/components/hook-form'

export default ({ nestIndex, control }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `test[${nestIndex}].nestedArray`
  });

  return (
    <div>
      <div style={{ marginLeft: 10, borderLeft: "2px solid red" }}>
        {fields.map((item, k) => {
          return (
            <div
              key={item.id}
              style={{ height: "50px", display: "flex", marginLeft: 10 }}
            >
              <RHFTextField
                type="number"
                name={`test[${nestIndex}].nestedArray[${k}].field1`}
                // register={register({
                //   required: { value: true, message: "Required" },
                //   min: { value: 0, message: "Min: 0" }
                // })}
                // defaultValue={item.field1}
                style={{ marginRight: "25px" }}
              />
              <button
                type="button"
                onClick={() => remove(k)}
                style={{ height: "40px", marginTop: 0 }}
              >
                Delete
              </button>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => append({ field1: "field1" })}
          style={{ marginLeft: "10px" }}
        >
          Append Nested
        </button>
      </div>

      <hr />
    </div>
  );
};



                            {/* {item.subs?.map(() => (
                                <Stack sx={{ mt: 2 }} direction={'row'} spacing={1}>
                                    <Button
                                        size="small"
                                        color="error"
                                        startIcon={<Iconify icon="eva:trash-2-outline" />}
                                        onClick={() => handleRemove(index)}
                                        disabled={index === 0 ? true : false}
                                    >
                                        Remove
                                    </Button>
                                    <RHFTextField
                                        size="small"
                                        name={`items[${index}].description`}
                                        label="Description"
                                    />
                                    <RHFTextField
                                        size="small"
                                        name={`items[${index}].description`}
                                        label="Description"
                                    />
                                    <RHFTextField
                                        size="small"
                                        name={`items[${index}].description`}
                                        label="Description"
                                    />
                                    <RHFTextField
                                        size="small"
                                        name={`items[${index}].description`}
                                        label="Description"
                                    />
                                    <RHFTextField
                                        size="small"
                                        name={`items[${index}].description`}
                                        label="Description"
                                    />
                                </Stack>
                            ))} */}