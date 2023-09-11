import { Tune } from "@mui/icons-material";

import TemporaryDrawer from "../shared/TemporaryDrawer";
import React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Slider,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  setDefaultAcousticness,
  setDefaultDanceability,
  setDefaultEnergy,
  setDefaultInstrumentalness,
  setDefaultPopularity,
  setDefaultTempo,
  setDefaultValence,
} from "../../state/slices/controlsSlice";

export default function ControlsDrawer() {
  const dispatch = useAppDispatch();

  const controls = useAppSelector((state) => state.controls);
  const defaultControls = { ...controls };

  const [popularity, setPopularity] = React.useState<number[]>([
    defaultControls.minPopularity,
    defaultControls.maxPopularity,
  ]);
  const [acousticness, setAcousticness] = React.useState<number[]>([
    defaultControls.minAcousticness,
    defaultControls.maxAcousticness,
  ]);
  const [danceability, setDanceability] = React.useState<number[]>([
    defaultControls.minDanceability,
    defaultControls.maxDanceability,
  ]);
  const [energy, setEnergy] = React.useState<number[]>([
    defaultControls.minEnergy,
    defaultControls.maxEnergy,
  ]);
  const [instrumentalness, setInstrumentalness] = React.useState<number[]>([
    defaultControls.minInstrumentalness,
    defaultControls.maxInstrumentalness,
  ]);
  const [tempo, setTempo] = React.useState<number[]>([
    defaultControls.minTempo,
    defaultControls.maxTempo,
  ]);
  const [valence, setValence] = React.useState<number[]>([
    defaultControls.minValence,
    defaultControls.maxValence,
  ]);

  return (
    <TemporaryDrawer icon={<Tune />} title="Recommendation Controls">
      <Box sx={{ pt: 1, pr: 1, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(setDefaultPopularity(popularity));
            dispatch(setDefaultAcousticness(acousticness));
            dispatch(setDefaultDanceability(danceability));
            dispatch(setDefaultEnergy(energy));
            dispatch(setDefaultInstrumentalness(instrumentalness));
            dispatch(setDefaultTempo(tempo));
            dispatch(setDefaultValence(valence));
          }}
        >
          Save
        </Button>
      </Box>
      <List sx={{ pr: 1 }}>
        {[
          {
            primary: "Popularity",
            value: popularity,
            setValue: setPopularity,
            min: 0,
            max: 100,
            step: 1,
          },
          {
            primary: "Acousticness",
            value: acousticness,
            setValue: setAcousticness,
            min: 0,
            max: 1,
            step: 0.01,
          },
          {
            primary: "Danceability",
            value: danceability,
            setValue: setDanceability,
            min: 0,
            max: 1,
            step: 0.01,
          },
          {
            primary: "Energy",
            value: energy,
            setValue: setEnergy,
            min: 0,
            max: 1,
            step: 0.01,
          },
          {
            primary: "Instrumentalness",
            value: instrumentalness,
            setValue: setInstrumentalness,
            min: 0,
            max: 1,
            step: 0.01,
          },
          {
            primary: "Tempo",
            value: tempo,
            setValue: setTempo,
            min: 0,
            max: 200,
            step: 1,
          },
          {
            primary: "Valence",
            value: valence,
            setValue: setValence,
            min: 0,
            max: 1,
            step: 0.01,
          },
        ].map((e) => (
          <ListItem key={e.primary}>
            <ListItemText
              primary={e.primary}
              secondary={`${e.value[0]} to ${e.value[1]}`}
            />
            <Slider
              value={e.value}
              onChange={(event: Event, newValue: number | number[]) => {
                e.setValue(newValue as number[]);
              }}
              min={e.min}
              max={e.max}
              step={e.step}
              sx={{ width: 150 }}
            />
          </ListItem>
        ))}
        <ListItem></ListItem>
      </List>
    </TemporaryDrawer>
  );
}
