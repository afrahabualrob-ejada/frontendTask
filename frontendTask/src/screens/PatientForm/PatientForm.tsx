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
  FormLabel,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { patientSchema } from "../../utils/validations/patientFormSchema";
import { disorderList, workspaceList } from "../../utils/data";
import { IFormInput } from "../../types";
import { StyledItem } from "./PatientForm.style";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Header } from "../../components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("Form submitted with data:", data);
  };

  useEffect(() => {
    if (fields.length === 0) append("");
  }, []);

  const selectedWorkspaces = watch("workspaces");
  const getFilteredOptions = (currentIndex: number) => {
    const selectedValues = selectedWorkspaces.filter(
      (_, index) => index !== currentIndex
    );
    return workspaceList.filter((option) => !selectedValues.includes(option));
  };
  const addWorkspace = () => {
    const lastWorkspace = selectedWorkspaces[selectedWorkspaces.length - 1];
    if (lastWorkspace) {
      append("");
    }
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
                <TextField
                  size="small"
                  {...field}
                  variant="outlined"
                  sx={{ minWidth: "250px", mr: 4 }}
                  label={
                    <Typography>
                      First Name
                      <Star />
                    </Typography>
                  }
                />
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
                <TextField
                  size="small"
                  {...field}
                  variant="outlined"
                  sx={{ minWidth: "250px", mr: 4 }}
                  label={
                    <Typography>
                      Last Name
                      <Star />
                    </Typography>
                  }
                />
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
          <FormLabel>
            Gender
            <Star />
          </FormLabel>
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
                <StyledItem
                  value="male"
                  control={<Radio />}
                  label="Male"
                  selected={field.value === "male"}
                />

                <StyledItem
                  value="female"
                  control={<Radio />}
                  label="Female"
                  selected={field.value === "female"}
                />
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
                  maxDate={dayjs().endOf("day")}
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
          <FormLabel>
            Disorders
            <Star />
          </FormLabel>
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
                          const currentDisorder = e.target.checked
                            ? [...field.value, disorder]
                            : field.value.filter((d) => d !== disorder);
                          field.onChange(currentDisorder);
                        }}
                      />
                    }
                    label={disorder}
                    selected={field.value.includes(disorder)}
                  />
                )}
              />
            ))}
          </FormGroup>
          {errors.disorders && (
            <FormHelperText error>{errors.disorders.message}</FormHelperText>
          )}
        </FormControl>
        <Box display="flex" gap={2} flexWrap="wrap" rowGap={0} mt={1}>
          {fields.map((item, index) => (
            <FormControl
              key={item.id}
              margin="normal"
              sx={{ minWidth: "250px" }}
              size="small"
            >
              <InputLabel id="demo-multiple-name-label">
                <Typography>
                  Workspace template <Star />
                </Typography>
              </InputLabel>

              <Controller
                name={`workspaces.${index}`}
                control={control}
                render={({ field }) => (
                  <Select
                    IconComponent={KeyboardArrowDownIcon}
                    labelId="demo-multiple-name-label"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    input={
                      <OutlinedInput
                        label={
                          <Typography>
                            Workspace template
                            <Star />
                          </Typography>
                        }
                      />
                    }
                  >
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
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          flexWrap="wrap"
          rowGap={1}
        >
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
            <FormHelperText sx={{ mt: 1 }}>
              Sorry,All existing workspace already added..
            </FormHelperText>
          )}
        </Box>

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
