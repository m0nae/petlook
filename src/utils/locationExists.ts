export function locationExists(location: any) {
  // i only check for the existence of "longitude" because i assume that if longitude exists,
  // then latitude will as well. though maybe i shouldn't be holding assumptions like that...
  if (location.coordinates?.longitude) {
    return true;
  } else if (customLocationExists(location)) {
    return true;
  } else {
    return false;
  }
}

export function locationCoordinatesExist(location: any) {
  if (location.coordinates?.longitude && location.coordinates?.latitude) {
    return true;
  } else {
    return false;
  }
}

export function customLocationExists(location: any) {
  if (location.custom && location.custom.length > 0 && location.custom !== "") {
    return true;
  } else {
    return false;
  }
}
