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
        : 'SR. SYSTEMS ENGINEER // DISTRIBUTED BACKEND';

    return (
        <section
            className="lg:col-span-8 border border-black/20 bg-surface-container-lowest shadow-[4px_4px_0px_#0A0A0A] flex flex-col font-mono select-none"
            id="ApplicantRankingsGrid"
        >
            {/* Header Strip */}
            <div className="w-full bg-surface-container px-4 sm:px-6 py-3 border-b border-black/20 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-canvas-blueprint font-bold text-base">+</span>
                    <span className="text-sm font-bold uppercase text-ink-primary tracking-tight">
                        [ APPLICANT POOL RANKINGS // COSINE SIMILARITY SORT ]
                    </span>
                </div>
                <span className="text-xs text-on-surface-variant border border-black/15 px-2 py-0.5 bg-surface font-bold">
                    [ ALGORITHMIC AUDIT ]
                </span>
            </div>

            {/* Active Context Subhead & Filters */}
            <div className="w-full px-4 sm:px-6 py-3 bg-surface-container-low border-b border-black/15 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold">
                    <span className="text-canvas-blueprint">REQUISITION:</span>
                    <span className="bg-surface px-2 py-0.5 border border-black/15 text-ink-primary">
                        {jobTitle}
                    </span>
                </div>

                {/* Filter Selectors */}
                <div className="flex items-center gap-1.5 flex-wrap text-xs">
                    <span className="text-on-surface-variant font-bold pr-1">FILTERS:</span>
                    <button
                        onClick={() => setFilterMode('COSINE_DESC')}
                        className={`px-2.5 py-1 uppercase cursor-pointer border transition-none font-bold ${
                            filterMode === 'COSINE_DESC'
                                ? 'bg-canvas-blueprint text-white border-canvas-blueprint'
                                : 'bg-surface text-ink-primary border-black/20 hover:bg-surface-container'
                        }`}
                        type="button"
                    >
                        [ MATCH % DESC ]
                    </button>
                    <button
                        onClick={() => setFilterMode('TRUST_90')}
                        className={`px-2.5 py-1 uppercase cursor-pointer border transition-none font-bold ${
                            filterMode === 'TRUST_90'
                                ? 'bg-canvas-blueprint text-white border-canvas-blueprint'
                                : 'bg-surface text-ink-primary border-black/20 hover:bg-surface-container'
                        }`}
                        type="button"
                    >
                        [ SCORE &gt; 90 ]
                    </button>
                    <button
                        onClick={() => setFilterMode('ZERO_FLAG')}
                        className={`px-2.5 py-1 uppercase cursor-pointer border transition-none font-bold ${
                            filterMode === 'ZERO_FLAG'
                                ? 'bg-canvas-blueprint text-white border-canvas-blueprint'
                                : 'bg-surface text-ink-primary border-black/20 hover:bg-surface-container'
                        }`}
                        type="button"
                    >
                        [ ZERO FLAGS ]
                    </button>
                </div>
            </div>

            {/* Candidates Diagnostic Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                    <thead>
                        <tr className="bg-surface-container border-b border-black/15 text-xs text-on-surface-variant uppercase font-bold">
                            <th className="py-3 px-3 border-r border-black/15 w-12 text-center">RANK</th>
                            <th className="py-3 px-4 border-r border-black/15 w-32">COSINE MATCH</th>
                            <th className="py-3 px-4 border-r border-black/15">CANDIDATE DOSSIER</th>
                            <th className="py-3 px-4 border-r border-black/15">VERIFIED SKILLS</th>
                            <th className="py-3 px-4 border-r border-black/15">PROCTOR INTEGRITY</th>
                            <th className="py-3 px-3 border-r border-black/15 text-center">RATING</th>
                            <th className="py-3 px-4 text-right">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10">
                        {applicants.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="py-8 px-4 text-center text-outline">
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
                                            className={`py-4 px-3 border-r border-black/15 text-center font-bold text-base ${
                                                isTopRank ? 'text-canvas-blueprint' : 'text-ink-primary'
                                            }`}
                                        >
                                            {rankDisplay}
                                        </td>
                                        <td className="py-4 px-4 border-r border-black/15">
                                            <div
                                                className={`text-lg font-bold leading-none ${
                                                    isTopRank ? 'text-canvas-blueprint' : 'text-ink-primary'
                                                }`}
                                            >
                                                {candidate.cosine_sim}%
                                            </div>
                                            <div className="text-[11px] text-outline font-bold mt-1">
                                                COSINE MATCH
                                            </div>
                                            {/* Inline Spark Bar Meter */}
                                            <div className="w-full bg-surface-container h-1.5 mt-1.5 border border-black/10">
                                                <div
                                                    className={`h-full ${
                                                        isTopRank
                                                            ? 'bg-canvas-blueprint'
                                                            : idx === 1
                                                            ? 'bg-blue-400'
                                                            : 'bg-outline'
                                                    }`}
                                                    style={{ width: `${Math.min(100, parseFloat(candidate.cosine_sim) || 85)}%` }}
                                                />
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 border-r border-black/15">
                                            <div className="font-bold text-ink-primary text-sm sm:text-base uppercase">
                                                {candidate.candidate_name}
                                                <span className="text-xs text-canvas-blueprint border border-canvas-blueprint/30 px-1.5 py-0.5 ml-2 font-bold">
                                                    [{candidate.candidate_ref || `SF-${100 + idx}`}]
                                                </span>
                                            </div>
                                            <div className="text-xs text-on-surface-variant mt-0.5 font-mono">
                                                {candidate.role_label || 'Full-Stack Systems Engineer (Exp: 5+ yrs)'}
                                            </div>
                                            <div className="text-[11px] text-outline mt-0.5 font-mono">
                                                REGION: {candidate.region || 'US-EAST (VERIFIED)'}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 border-r border-black/15 text-xs">
                                            <div className="text-ink-primary font-bold">PDF PARSED ✓</div>
                                            <div className="text-on-surface-variant font-mono mt-0.5">
                                                GITHUB: {candidate.github_repos || 'AUDITED'}
                                            </div>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {(candidate.tags ? candidate.tags.slice(0, 3) : ['PYTHON', 'DJANGO']).map((t, ti) => (
                                                    <span key={ti} className="border border-canvas-blueprint/30 bg-blue-50 text-canvas-blueprint font-bold px-1.5 py-0.2 text-[10px]">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 border-r border-black/15 font-mono">
                                            <div className="inline-block border border-canvas-blueprint/30 bg-blue-50 px-2 py-0.5 text-xs font-bold text-canvas-blueprint">
                                                PROCTOR: {candidate.proctor_score || '98%'}
                                            </div>
                                            <div className="text-xs text-ink-primary font-bold mt-1">
                                                {candidate.proctor_flags || 'ZERO CHEATING FLAGS'}
                                            </div>
                                            <div className="text-[11px] text-outline mt-0.5">
                                                CAM: {candidate.cam_status || 'VERIFIED (1080P)'}
                                            </div>
                                        </td>
                                        <td className="py-4 px-3 border-r border-black/15 text-center">
                                            <div className="text-canvas-blueprint text-sm font-bold">
                                                {candidate.stars || '★★★★★'}
                                            </div>
                                            <div className="text-[11px] text-outline font-bold mt-0.5">
                                                ({candidate.rating_num || '4.8 / 5.0'})
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right align-middle">
                                            <div className="flex flex-col items-end gap-1.5">
                                                <button
                                                    onClick={() => onIssueOffer(candidate)}
                                                    className="bg-canvas-blueprint text-white text-xs px-3 py-1.5 border border-canvas-blueprint hover:bg-primary-hover uppercase transition-none cursor-pointer w-full text-center font-bold"
                                                    type="button"
                                                >
                                                    [ ISSUE OFFER ]
                                                </button>
                                                <button
                                                    onClick={() => onInspectCandidate(candidate)}
                                                    className="bg-surface text-ink-primary text-xs px-3 py-1.5 border border-black/20 hover:bg-surface-container uppercase transition-none cursor-pointer w-full text-center font-bold"
                                                    type="button"
                                                >
                                                    [ INSPECT DOSSIER ]
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
            <div className="w-full bg-surface-container-low px-4 sm:px-6 py-2.5 border-t border-black/15 flex flex-wrap items-center justify-between text-xs text-on-surface-variant">
                <div>
                    TOTAL RANKED: {applicants.length} AUDITED CANDIDATES
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-canvas-blueprint font-bold">[ ENCLAVE VERIFIED ]</span>
                </div>
            </div>
        </section>
    );
};

export default ApplicantRankingsGrid;
