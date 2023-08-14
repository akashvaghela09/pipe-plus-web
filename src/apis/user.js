import { supabase } from "../configs/supabase-config";
import { isValid } from "../utils";

export const user = {
    subscriptions: async (user_id) => {
        const res = await supabase
            .from('pipe_subscriptions')
            .select('uploader_id')
            .eq('user_id', user_id)

        if (isValid(res.error)) {
            console.log("Failed while getting list", res.error);
            return { success: false, error: res.error }
        }

        const uniqueUploaderIds = arr => [...new Set(arr.map(item => item.uploader_id))];
        const list = uniqueUploaderIds(res.data);
      
        return { success: true, list: list }
    }
};

