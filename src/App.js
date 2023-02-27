import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import logo from "./assset/imgs/logo.0cbf9e63b4a021661126.gif";
import share from "./assset/imgs/share.svg";
import fullscreen from "./assset/imgs/fullscreen.svg";
import volume from "./assset/imgs/volume-active.svg";
import ummte from "./assset/imgs/volume-muted.svg";
import background from "./assset/background/Honolulu+Balcony+Day.mp4";
import { Grid, Typography, Box, IconButton, Link} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";


function App() {
  const audioRef = useRef();
  const [isPlaying, setPlaying] = useState(false);
  const [music, setMusic] = useState(null);
  const [name, setName] = useState(null);
  const [artist, setArtist] = useState(null);
  const [currentSong, setCurrentSong] = useState(0);

  const [dateState, setDateState] = useState(new Date());
  const [muted, setMuted] = useState(false);
  const [Full, setFull] = useState(true);

  function handlerSkipSong() {
    if (currentSong + 1 <= music.length) {
      setCurrentSong((currentSong + 1) % music.length);
      console.log((currentSong + 1) % music.length);
    } else if (currentSong + 1 > music.length) {
      setCurrentSong(0 % music.length);
      console.log(0 % music.length);
    }

    //setCurrentTime(0)
  }

  function openFullscreen() {
    if (Full) {
      document.body?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFull(!Full);
  }

  function handleToggleMute() {
    setMuted((current) => !current);
  }

  const shareScreenMedia = async () => {
    try {
      await navigator.share({ title: "clone lo-fi pop", url: "" });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  useEffect(() => {
    async function fetchMusic() {
      const response = await fetch("https://woboba.github.io/example.json");
      const data = await response.json();
      setMusic(data[currentSong].audio);
      setName(data[currentSong].name);
      setArtist(data[currentSong].artist);
      //console.log(data[currentSong].name);
    }
    fetchMusic();
  }, [currentSong]);

  function handleplay() {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setPlaying(!isPlaying);
  }

  function handleNext() {
    setCurrentSong((currentSong + 1) % music.length);
  }

  function handlePrevious() {
    setCurrentSong((currentSong - 1) % music.length);
  }

  return (
    <div id="full">
      <Grid container spacing={3}>
        <video autoPlay loop muted className="background">
          <source src={background} type="video/mp4" />
        </video>
        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "1em",
            }}
          >
            <Grid item xs={6} sm={8}>
              <img src={logo} alt="loading..." className="logo" />
            </Grid>
            <Grid item sm={1}>
              {/* <Button
          startIcon={<ImportContactsIcon />}
          variant="contained"
          sx={{
            color: "white",
            border: "1px solid black",
            background: "black",
            "&:hover": {
              background: "black",
              opacity: "0.3",
            },
          }}
          onClick={toggleLibraryOpen}
        >
          Library
        </Button> */}
            </Grid>
            <Grid item sm={1}>
              <Typography
                variant="p"
                component="p"
                className="time element-to-hide"
              >
                {dateState.toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </Typography>{" "}
            </Grid>
            <Grid item xs={4} sm={2}>
              <img
                src={share}
                alt="share"
                onClick={shareScreenMedia}
                loading="lazy"
                className="Button element-to-hide"
              />
              {muted ? (
                <img
                  src={ummte}
                  alt="volume"
                  onClick={handleToggleMute}
                  loading="lazy"
                  className="Button element-to-hide"
                />
              ) : (
                <img
                  src={volume}
                  alt="volume"
                  onClick={handleToggleMute}
                  loading="lazy"
                  className="Button element-to-hide"
                />
              )}
              <img
                src={fullscreen}
                alt="fullscreen"
                onClick={openFullscreen}
                loading="lazy"
                className="Button element-to-hide"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "white",
              marginTop: "350px",
              ["@media (min-width:900px)"]: {
                marginTop: "500px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "0.5em",
              }}
            >
              <Typography variant="h4">{name}</Typography>
              <Typography variant="overline">{artist}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "1em",
                flexDirection: "column",
                width: { xs: "70%", md: "19%" },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <IconButton
                  aria-label="Previous"
                  sx={{ color: "white" }}
                  onClick={handlePrevious}
                >
                  <SkipPreviousRoundedIcon fontSize="large" />
                </IconButton>
                <IconButton
                  aria-label="Play/pause"
                  sx={{ color: "white" }}
                  onClick={handleplay}
                >
                  {isPlaying ? (
                    <PauseRoundedIcon fontSize="large" />
                  ) : (
                    <PlayArrowRoundedIcon fontSize="large" />
                  )}
                </IconButton>
                <IconButton
                  aria-label="Next"
                  sx={{ color: "white" }}
                  onClick={handleNext}
                >
                  <SkipNextRoundedIcon fontSize="large" />
                </IconButton>
              </Box>
            </Box>
            <audio
              ref={audioRef}
              src={music}
              muted={muted}
              autoPlay
              onEnded={handlerSkipSong}
            />
            {/* <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleplay}>{isPlaying ? "Pause" : "Play"}</button>
          <button onClick={handleNext}>Next</button> */}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ textAlign: "left", marginLeft: "20px", marginTop: "50px" }}
        >
          <Typography variant="p" id="ref">
            Use for educational purposes only. Music by - chosic.com © 2022 and lofi.co
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
