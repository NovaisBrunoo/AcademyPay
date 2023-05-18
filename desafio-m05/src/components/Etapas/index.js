import './style.css';
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useHooke } from "../../context/context";

export default function Etapas() {

  const { activeStep, skipped, steps } = useHooke()

  const isStepCadastrar = (step) => {
    return step === 0;
  };
  const isStepSenha = (step) => {
    return step === 1;
  };
  const isStepSucesso = (step) => {
    return step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  }


  return (
    <Box sx={{ width: "90%" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepCadastrar(index)) {
            labelProps.optional = (
              <Typography variant="caption">Por favor, escreva seu nome e e-mail</Typography>
            );
          }
          if (isStepSenha(index)) {
            labelProps.optional = (
              <Typography variant="caption">Escolha uma senha segura</Typography>
            );
          }
          if (isStepSucesso(index)) {
            labelProps.optional = (
              <Typography variant="caption">E-mail e senha cadastrados com sucesso</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {
        activeStep === steps.length ? (
          <React.Fragment>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />


            </Box>
          </React.Fragment>
        )
      }

    </Box >
  );
}
