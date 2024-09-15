import { useEffect } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Button,
  Container,
  Typography,
  Box,
  TextField,
  RadioGroup,
  Radio,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { patientSchema } from "../../utills/validations/patientFormSchema";
import { disorderList, workspaceList } from "../../utills/data";
import { IFormInput } from "../../types";
import { Header } from "../../components/Header";
import { Placeholder, StyledItem } from "./PatientFormStyle";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const PatientForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IFormInput>({
    resolver: yupResolver(patientSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      birthDate: null,
      disorders: [],
      workspaces: [""],
    },
  });
  const { fields, append } = useFieldArray<IFormInput>({
    control,
    name: "workspaces" as never,
  });

  const addWorkspace = () => append("");
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("Form submitted with data:", data);
  };

  useEffect(() => {
    if (fields.length === 0) append("");
  }, [fields, append]);

  const selectedWorkspaces = watch("workspaces");
  const getFilteredOptions = (currentIndex: number) => {
    const selectedValues = selectedWorkspaces.filter(
      (_, index) => index !== currentIndex
    );
    return workspaceList.filter((option) => !selectedValues.includes(option));
  };
  const Star = () => <span style={{ color: "var(--primary)" }}> * </span>;
  return (
    <Container>
      <Header title="PATIENT DATA" />
      <Typography variant="h6" align="left" color="textPrimary">
        Add a Patient
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          margin="normal"
          sx={{
            minWidth: "250px",
          }}
        >
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <>
                <Box sx={{ position: "relative" }}>
                  <TextField
                    size="small"
                    {...field}
                    variant="outlined"
                    sx={{ minWidth: "250px", mr: 4 }}
                  />
                  {!field.value && (
                    <Placeholder>
                      First Name <Star />
                    </Placeholder>
                  )}
                </Box>

                {errors.firstName && (
                  <FormHelperText error>
                    {errors.firstName.message}
                  </FormHelperText>
                )}
              </>
            )}
          />
        </FormControl>
        <FormControl margin="normal" sx={{ minWidth: "250px" }}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <>
                <Box sx={{ position: "relative" }}>
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: "250px" }}
                  />
                  {!field.value && (
                    <Placeholder>
                      Last Name <Star />
                    </Placeholder>
                  )}
                </Box>
                {errors.lastName && (
                  <FormHelperText error>
                    {errors.lastName.message}
                  </FormHelperText>
                )}
              </>
            )}
          />
        </FormControl>
        <FormControl fullWidth margin="none" sx={{ mt: 2 }}>
          <Typography variant="body2" color="textPrimary">
            Gender
            <Star />
          </Typography>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                aria-label="gender"
                name="gender"
                value={field.value}
                onChange={field.onChange}
                row
                sx={{ ml: 1 }}
              >
                <StyledItem value="male" control={<Radio />} label="Male" />
                <StyledItem value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            )}
          />
          {errors.gender && (
            <FormHelperText error>{errors.gender.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl sx={{ mt: 3 }}>
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={
                    <Typography>
                      Date of Birth
                      <Star />
                    </Typography>
                  }
                  value={field.value}
                  onChange={field.onChange}
                  maxDate={dayjs().subtract(1, "day")}
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            )}
          />
          {errors.birthDate && (
            <FormHelperText error>{errors.birthDate.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth margin="normal" sx={{ mt: 3 }}>
          <Typography variant="body2" color="textPrimary" sx={{ m: 0 }}>
            Disorders
            <Star />
          </Typography>
          <FormGroup row sx={{ ml: 1, rowGap: 1 }}>
            {disorderList.map((disorder) => (
              <Controller
                key={disorder}
                name={`disorders`}
                control={control}
                render={({ field }) => (
                  <StyledItem
                    control={
                      <Checkbox
                        checked={field.value.includes(disorder)}
                        onChange={(e) => {
                          const selectedDisorders = field.value || [];
                          if (e.target.checked) {
                            field.onChange([...selectedDisorders, disorder]);
                          } else {
                            field.onChange(
                              selectedDisorders.filter((d) => d !== disorder)
                            );
                          }
                        }}
                      />
                    }
                    label={disorder}
                  />
                )}
              />
            ))}
          </FormGroup>
          {errors.disorders && (
            <FormHelperText error>{errors.disorders.message}</FormHelperText>
          )}
        </FormControl>
        <Box display="flex" gap={2} flexWrap="wrap" rowGap={0}>
          {fields.map((item, index) => (
            <FormControl
              key={item.id}
              margin="normal"
              sx={{ minWidth: "250px" }}
              size="small"
            >
              <Controller
                name={`workspaces.${index}`}
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    displayEmpty
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    <MenuItem disabled value="">
                      Workspace template <Star />
                    </MenuItem>
                    {getFilteredOptions(index).map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.workspaces?.[index] && (
                <FormHelperText error>
                  {errors.workspaces[index]?.message}
                </FormHelperText>
              )}
            </FormControl>
          ))}
        </Box>
        <Button
          type="button"
          variant="outlined"
          onClick={addWorkspace}
          color="success"
          sx={{ textTransform: "none", mt: 1 }}
          disabled={selectedWorkspaces.length >= workspaceList.length}
        >
          Add More Workspace
        </Button>
        {selectedWorkspaces.length >= workspaceList.length && (
          <FormHelperText error sx={{ mt: 1 }}>
            Sorry,All existing workspace added..
          </FormHelperText>
        )}
        <Box mt={3} display="flex" gap={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ px: 3, textTransform: "none" }}
          >
            Save
          </Button>
          <Button
            type="button"
            variant="text"
            color="inherit"
            sx={{ px: 3, textTransform: "none" }}
            onClick={() => reset()}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default PatientForm;
