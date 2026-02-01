import { MetadataRoute } from "next";

export default function robots():MetadataRoute.Robots{
    const baseUrl = "https://dailtech.in";
    return{
        rules:[
            {
                userAgent:"*",
                allow:"/",
                disallow:["/terms","/privacy"]
            }
        ],
        sitemap:`${baseUrl}/sitemap.xml`
    }
}