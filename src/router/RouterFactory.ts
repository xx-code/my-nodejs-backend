/*import Developper from "./user/Developper";
import DevSkill from "./devSkill/DevSkill";
import Gallery from "./media/Gallery";
import Media from "./media/Media";
import Project from "./project/Project";
import ProjectDevelopper from "./project/ProjectDevelopper";
import ProjectLink from "./project/ProjectLink";
import Resume from "./user/Resume";*/
import UserRequest from "./user/User";

export default class RouterFactory {

    getInstanceRequest(instanceName: string) {
        if (instanceName.toLowerCase() == 'user')
            return new UserRequest();
        /*if (instanceName.toLowerCase() == 'developper')
            return new DevelopperRequest();
        if (instanceName.toLowerCase() == 'devskill')
            return new DevSkillRequest();
        if (instanceName.toLowerCase() == 'gallery')
            return new GalleryRequest();
        if (instanceName.toLowerCase() == 'media')
            return new MediaRequest();
        if (instanceName.toLowerCase() == 'project')
            return new ProjectRequest();
        if (instanceName.toLowerCase() == 'projectdevelopper')
            return new ProjectDevelopperRequest();
        if (instanceName.toLowerCase() == 'projectLink')
            return new ProjectLinkRequest();
        if (instanceName.toLowerCase() == 'resume')
            return new ResumeRequest();
        if (instanceName.toLowerCase() == 'socialLink')
            return new SocialLinkRequest();*/
    }
}