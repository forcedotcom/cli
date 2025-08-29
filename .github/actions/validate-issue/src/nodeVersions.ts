/*
 * Copyright 2025, Salesforce, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

type VersionInfo = {
  start: Date;
  end: Date;
};

export const isAnyVersionValid = (currentDate: Date) => async (
  versions: string[]
): Promise<boolean> => {
  const resp = (await ((
    await fetch(
      "https://raw.githubusercontent.com/nodejs/Release/main/schedule.json"
    )
  ).json() as unknown)) as Record<string, VersionInfo>;

  return versions
    .map((version) => `v${version}`)
    .some(
      (formattedVersion) =>
        formattedVersion in resp &&
        currentDate >= new Date(resp[formattedVersion].start) &&
        currentDate <= new Date(resp[formattedVersion].end)
    );
};
