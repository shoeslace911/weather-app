import { PropTypes } from "@mui/material";

export const CurrentWeatherPropTypes = {
  data: PropTypes.shape({
    city: PropTypes.string.isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
      deg: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  forecastData: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        dt_txt: PropTypes.string.isRequired,
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            main: PropTypes.string.isRequired,
          })
        ).isRequired,
        main: PropTypes.shape({
          temp: PropTypes.number.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};
