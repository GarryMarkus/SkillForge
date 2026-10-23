import React from 'react';

const ApplicantRankingsGrid = ({
    selectedJob,
    applicants = [],
    filterMode = 'COSINE_DESC',
    setFilterMode,
    onInspectCandidate,
    onIssueOffer
}) => {
    const jobTitle = selectedJob?.title
        ? selectedJob.title.toUpperCase()
        : 'SR. SYSTEMS ENGINEER // DISTRIBUTED_BACKEND';

    return (
        <section
            className="lg:col-span-8 border border-black/20 bg-surface-container-lowest flex flex-col"
            id="ApplicantRankingsGrid"
        >
            {/* Header Strip */}
            <div className="w-full bg-surface-container px-space-md py-space-xs border-b border-black/20 flex flex-wrap items-center justify-between gap-y-1">
                <div className="flex items-center gap-space-sm">
                    <span className="text-primary-container font-bold">+</span>
                    <span className="font-headline-sm text-headline-sm uppercase text-on-surface tracking-tight font-bold">
                        [ APPLICANT_POOL_RANKINGS // FILTERED_BY_COSINE_SIMILARITY ]
                    </span>
                </div>
                <span className="text-label-sm font-label-sm text-secondary border border-black/15 px-space-xs py-0.5 bg-surface font-bold">
                    [SYS_REF: TFIDF_MAT_L2]
                </span>
            </div>

            {/* Active Context Subhead & Filters */}
            <div className="w-full px-space-md py-space-sm bg-surface-container-low border-b border-black/15 flex flex-wrap items-center justify-between gap-space-sm">
                <div className="flex items-center gap-2 text-label-md font-label-md">
                    <span className="text-primary-container font-bold">INSPECTING:</span>
                    <span className="bg-surface px-space-xs py-0.5 border border-black/15 font-bold text-on-surface">
                        {jobTitle}
                    </span>
                </div>

                {/* Filter Selectors */}
                <div className="flex items-center gap-1 flex-wrap text-label-sm font-label-sm">
                    <span className="text-secondary pr-1 font-bold">FILTERS:</span>
                    <button
                        onClick={() => setFilterMode('COSINE_DESC')}
                        className={`px-space-xs py-0.5 uppercase cursor-pointer border transition-none font-bold ${
                            filterMode === 'COSINE_DESC'
                                ? 'bg-primary-container text-on-primary border-primary-container'
                                : 'bg-surface text-on-surface border-black/20 hover:bg-surface-container'
                        }`}
                        type="button"
                    >
                        [SORT: COSINE_MATCH_DESC]
                    </button>
                    <button
                        onClick={() => setFilterMode('TRUST_90')}
                        className={`px-space-xs py-0.5 uppercase cursor-pointer border transition-none font-bold ${
                            filterMode === 'TRUST_90'
                                ? 'bg-primary-container text-on-primary border-primary-container'
                                : 'bg-surface text-on-surface border-black/20 hover:bg-surface-container'
                        }`}
                        type="button"
                    >
                        [TRUST_SCORE &gt; 90]
                    </button>
                    <button
                        onClick={() => setFilterMode('ZERO_FLAG')}
                        className={`px-space-xs py-0.5 uppercase cursor-pointer border transition-none font-bold ${
                            filterMode === 'ZERO_FLAG'
                                ? 'bg-primary-container text-on-primary border-primary-container'
                                : 'bg-surface text-on-surface border-black/20 hover:bg-surface-container'
                        }`}
                        type="button"
                    >
                        [ZERO_FLAG_ONLY]
                    </button>
                </div>
            </div>

            {/* Candidates Diagnostic Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse text-left font-body-sm text-body-sm">
                    <thead>
                        <tr className="bg-surface-container border-b border-black/15 font-label-sm text-label-sm text-secondary uppercase">
                            <th className="p-space-sm border-r border-black/15 w-12 text-center font-bold">RANK</th>
                            <th className="p-space-sm border-r border-black/15 w-32 font-bold">COSINE_SIM</th>
                            <th className="p-space-sm border-r border-black/15 font-bold">CANDIDATE_DOSSIER</th>
                            <th className="p-space-sm border-r border-black/15 font-bold">VERIFICATION &amp; TELEMETRY</th>
                            <th className="p-space-sm border-r border-black/15 font-bold">PROCTOR_INTEGRITY</th>
                            <th className="p-space-sm border-r border-black/15 text-center font-bold">RATING</th>
                            <th className="p-space-sm text-right font-bold">DISPOSITION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10">
                        {applicants.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-space-md text-center text-outline italic">
                                    NO CANDIDATES MATCHING CURRENT HEURISTIC FILTER SET.
                                </td>
                            </tr>
                        ) : (
                            applicants.map((candidate, idx) => {
                                const rankDisplay = candidate.rank || `#${String(idx + 1).padStart(2, '0')}`;
                                const isTopRank = idx === 0;

                                return (
                                    <tr key={candidate.id || idx} className="hover:bg-surface-container-low transition-none">
                                        <td
                                            className={`p-space-sm border-r border-black/15 text-center font-bold font-headline-sm text-headline-sm ${
                                                isTopRank ? 'text-primary-container' : 'text-on-surface'
                                            }`}
                                        >
                                            {rankDisplay}
                                        </td>
                                        <td className="p-space-sm border-r border-black/15">
                                            <div
                                                className={`font-headline-sm text-headline-sm font-bold leading-none ${
                                                    isTopRank ? 'text-primary-container' : 'text-on-surface'
                                                }`}
                                            >
                                                {candidate.cosine_sim}%
                                            </div>
                                            <div className="text-label-sm font-label-sm text-secondary mt-1">
                                                [COSINE_MATCH]
                                            </div>
                                            {/* Inline Spark Bar Meter */}
                                            <div className="w-full bg-surface-container h-1 mt-1">
                                                <div
                                                    className={`h-1 ${
                                                        isTopRank
                                                            ? 'bg-primary-container'
                                                            : idx === 1
                                                            ? 'bg-tertiary-container'
                                                            : 'bg-outline'
                                                    }`}
                                                    style={{ width: `${Math.min(100, parseFloat(candidate.cosine_sim) || 85)}%` }}
                                                />
                                            </div>
                                        </td>
                                        <td className="p-space-sm border-r border-black/15">
                                            <div className="font-bold text-on-surface text-body-md font-body-md uppercase">
                                                {candidate.candidate_name}{' '}
                                                <span className="text-label-sm font-label-sm text-primary-container border border-primary-container/30 px-1 py-0.5 ml-1">
                                                    [{candidate.candidate_ref || `SF-${100 + idx}`}]
                                                </span>
                                            </div>
                                            <div className="text-label-sm font-label-sm text-secondary">
                                                {candidate.role_label || 'Full-Stack Systems Engineer (Exp: 5+ yrs)'}
                                            </div>
                                            <div className="text-label-sm font-label-sm text-on-surface-variant mt-1">
                                                HASH: {candidate.hash || '9a4f..77b2'} // REGION: {candidate.region || 'US-EAST (VERIFIED)'}
                                            </div>
                                        </td>
                                        <td className="p-space-sm border-r border-black/15 text-label-sm font-label-sm">
                                            <div className="text-on-surface font-bold">PDF_PARSED ✓</div>
                                            <div className="text-on-surface-variant mt-0.5">
                                                GITHUB: {candidate.github_repos || '32_REPOS'}
                                            </div>
                                            <div className="text-primary-container font-bold mt-0.5">
                                                [{candidate.tags ? candidate.tags.slice(0, 3).join(', ') : 'PYTHON, DJANGO'}]
                                            </div>
                                        </td>
                                        <td className="p-space-sm border-r border-black/15">
                                            <div className="inline-block border border-primary-container/30 bg-primary-fixed/30 px-space-xs py-0.5 text-label-sm font-label-sm font-bold text-primary-container">
                                                PROCTOR_SCORE: {candidate.proctor_score || '98%'}
                                            </div>
                                            <div className="text-label-sm font-label-sm text-on-surface mt-1">
                                                [{candidate.proctor_flags || 'ZERO_CHEATING_FLAGS'}]
                                            </div>
                                            <div className="text-label-sm font-label-sm text-secondary">
                                                CAM: {candidate.cam_status || 'SYNCHRONIZED (1080P)'}
                                            </div>
                                        </td>
                                        <td className="p-space-sm border-r border-black/15 text-center">
                                            <div className="text-primary-container text-body-md font-body-md font-bold">
                                                {candidate.stars || '★★★★★'}
                                            </div>
                                            <div className="text-label-sm font-label-sm text-secondary mt-0.5">
                                                ({candidate.rating_num || '4.8 / 5.0'})
                                            </div>
                                        </td>
                                        <td className="p-space-sm text-right align-middle">
                                            <div className="flex flex-col items-end gap-1">
                                                <button
                                                    onClick={() => onIssueOffer(candidate)}
                                                    className="bg-primary-container text-on-primary font-label-sm text-label-sm px-space-sm py-1 border border-primary-container hover:bg-primary uppercase transition-none cursor-pointer w-full text-center font-bold"
                                                    type="button"
                                                >
                                                    [ ISSUE_OFFER_INVITE ]
                                                </button>
                                                <button
                                                    onClick={() => onInspectCandidate(candidate)}
                                                    className="bg-surface text-on-surface font-label-sm text-label-sm px-space-sm py-1 border border-black/20 hover:bg-surface-container uppercase transition-none cursor-pointer w-full text-center font-bold"
                                                    type="button"
                                                >
                                                    [ INSPECT_DOSSIER ]
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Applicant Ranking Panel Footer */}
            <div className="w-full bg-surface-container-low px-space-md py-space-xs border-t border-black/15 flex flex-wrap items-center justify-between text-label-sm font-label-sm text-secondary">
                <div>
                    TOTAL_RANKED: {applicants.length} DOSSIERS AUDITED // COSINE_CUTOFF: 0.700
                </div>
                <div className="flex items-center gap-space-sm">
                    <span>SHOWING TOP {applicants.length}</span>
                    <span className="text-black/30">|</span>
                    <button
                        onClick={() => alert('[TELEMETRY_ENGINE] Additional batches loaded into active working buffer.')}
                        className="text-primary-container font-bold hover:underline cursor-pointer uppercase"
                        type="button"
                    >
                        [ LOAD_NEXT_BATCH_10 -&gt; ]
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ApplicantRankingsGrid;
