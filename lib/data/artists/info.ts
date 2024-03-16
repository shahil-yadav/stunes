import { DisplayArtistInformationPropsSchema } from "@/app/artist/artist-info";
import { URL, selectedImageIndex } from "@/lib/constants";
import { ArtistInformationSchema } from "@/lib/definitions/artists/info";

async function getArtistInformation(id: string) {
    const response: ArtistInformationSchema = await fetch(
        `${URL}/api/artists/${id}`,
    ).then((data) => data.json());
    return response;
}

export async function fetchArtistInformation(id: string) {
    const response = await getArtistInformation(id);
    
    if(response.success === false){
        throw new Error("Cannot fetch Artist Info")
    }

    const data: DisplayArtistInformationPropsSchema = {
        artist: {
            bio: response.data.bio.map((info) => ({
                text: info.text,
                title: info.title,
            })),
            connect: {
                fb: response.data.fb,
                twitter: response.data.twitter,
                wiki: response.data.wiki,
            },
            dob: response.data.dob,
            dominantLanguage: response.data.dominantLanguage,
            dominantType: response.data.dominantType,

            fanCount: response.data.fanCount,
            followerCount: response.data.fanCount,
            name: response.data.name,
            src: response.data.image.slice(selectedImageIndex)[0].url,
        },
    };
    return data;
}
