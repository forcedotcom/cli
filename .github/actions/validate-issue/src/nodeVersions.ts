type VersionInfo = {
  start: Date;
  end: Date;
};

export const isValidVersion = (currentDate: Date) => async (
  version: string
): Promise<boolean> => {
  const formattedVersion = `v${version}`;
  const resp = (await ((
    await fetch(
      "https://raw.githubusercontent.com/nodejs/Release/main/schedule.json"
    )
  ).json() as unknown)) as Record<string, VersionInfo>;
  return (
    formattedVersion in resp &&
    currentDate >= new Date(resp[formattedVersion].start) &&
    currentDate <= new Date(resp[formattedVersion].end)
  );
};
