import { getProjectBySlugApi, getYoutubeLinkBySlug, getVisualImageUrl } from "@/lib/api";
import { PROJECTS } from "@/lib/projectsData";
import ProjectHero from "@/Components/project/ProjectHero";
import ProjectStats from "@/Components/project/ProjectStats";
import ProjectBenefits from "@/Components/project/ProjectBenefits";
import ProjectVisuals from "@/Components/project/ProjectVisuals";
import ProjectResources from "@/Components/project/ProjectResources";
import ProjectQuestionCTA from "@/Components/project/ProjectQuestionCTA";
import ProjectTerms from "@/Components/project/ProjectTerms";
import ProjectInvestCTA from "@/Components/project/ProjectInvestCTA";
import ProjectVideo from "@/Components/project/ProjectVideo";

const HERO_IMAGE_FALLBACK = "/p2hero.png";
const STATIC = PROJECTS[0];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const api = await getProjectBySlugApi(slug);
  if (api.ok && api.data) {
    return {
      title: `${api.data.fullName} — Nuraya`,
      description: api.data.tagline,
    };
  }
  return { title: `${STATIC.fullName} — Nuraya`, description: STATIC.tagline };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [apiResult, youtubeLink] = await Promise.all([
    getProjectBySlugApi(slug),
    getYoutubeLinkBySlug(slug),
  ]);
  const api = apiResult.ok ? apiResult.data : null;

  const hero = api ?? STATIC;
  const heroImage = (api?.heroImage || STATIC.heroImage) ?? HERO_IMAGE_FALLBACK;
  const apiVisuals =
    api?.visuals
      ?.filter((v) => v && getVisualImageUrl(v.image))
      .map((v) => ({
        title: v.title ?? "Visual",
        description: v.description ?? "",
        image: getVisualImageUrl(v.image),
      })) ?? [];
  const visuals = apiVisuals.length > 0 ? apiVisuals : STATIC.visuals;

  return (
    <div className="pt-4">
      <ProjectHero
        fullName={hero.fullName}
        tagline={hero.tagline}
        price={hero.price}
        heroImage={heroImage}
        heroSubtitleLeft={hero.heroSubtitleLeft}
        heroSubtitleRight={hero.heroSubtitleRight}
        heroBottomLine1={hero.heroBottomLine1}
        heroBottomLine2={hero.heroBottomLine2}
        comingSoon={hero.comingSoon ?? false}
      />
      <ProjectStats name={STATIC.name} stats={STATIC.numbers} />
      {youtubeLink?.url && <ProjectVideo youtubeUrl={youtubeLink.url} />}
      <ProjectBenefits benefits={STATIC.benefits} />
      <ProjectVisuals visuals={visuals} altPrefix={hero.fullName} />
      <ProjectResources
        resources={STATIC.resources}
        projectName={STATIC.name}
      />
      <ProjectQuestionCTA />
      <ProjectTerms name={STATIC.fullName} terms={STATIC.terms} />
      <ProjectInvestCTA
        name={STATIC.name}
        fullName={STATIC.fullName}
        price={STATIC.price}
        image={STATIC.investCtaImage}
        comingSoon={STATIC.comingSoon}
      />
    </div>
  );
}
