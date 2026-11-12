// Copyright (C) 2017-2023 Smart code 203358507

import { useEffect } from 'react';
import { usePlatform } from 'stremio/common';
import useProfile from 'stremio/common/useProfile';

// Pushes the Omniphony spatial settings (spatialAudio / spatialOsd) to the
// shell over IPC whenever they change. The shell persists them into the
// gschema and applies them to the player. Fires on mount (app start / login)
// and on every UpdateSettings re-render, which makes the OSD toggle realtime;
// the audio decoder chain is applied by mpv at the next track.
const useSpatialSettingsSync = () => {
    const { shell } = usePlatform();
    const profile = useProfile();
    const spatialAudio = profile.settings?.spatialAudio;
    const spatialOsd = profile.settings?.spatialOsd;

    useEffect(() => {
        if (typeof spatialAudio !== 'boolean' || typeof spatialOsd !== 'boolean') {
            return;
        }
        if (!shell.active) {
            return;
        }
        shell.send('settings-update', { spatialAudio, spatialOsd });
    }, [spatialAudio, spatialOsd, shell]);
};

export default useSpatialSettingsSync;
