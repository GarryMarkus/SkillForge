import React from 'react';
import { useAuthStore } from '../../../store/authStore';

const RoleCard = ({ role, title, code, description, specifications, selectRole, selected }) => {
    return (
        <div
            onClick={() => selectRole(role)}
            className={`p-space-md border transition-none cursor-pointer flex flex-col justify-between ${
                selected
                    ? 'border-2 border-primary-container bg-primary-fixed/20 shadow-[3px_3px_0px_#1D52B8]'
                    : 'border-black/20 bg-surface hover:bg-surface-container-low'
            }`}
        >
            <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-secondary font-bold uppercase">
                        [{code}]
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.2 border uppercase font-bold ${
                        selected
                            ? 'bg-primary-container text-white border-primary-container'
                            : 'bg-surface border-black/15 text-secondary'
                    }`}>
                        {selected ? 'SELECTED' : 'SELECT'}
                    </span>
                </div>

                <h3 className="text-body-md font-bold text-on-surface uppercase mb-1">
                    {title}
                </h3>
                <p className="text-body-sm text-secondary leading-relaxed mb-3">
                    {description}
                </p>
            </div>

            <div className="border-t border-black/10 pt-2 space-y-1">
                {specifications.map((spec, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-label-sm text-on-surface-variant font-bold">
                        <span className="text-primary-container font-bold">+</span>
                        <span>{spec}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Step1Role = () => {
    const { role, setRole } = useAuthStore();

    return (
        <div className="space-y-space-md font-mono">
            <div className="border-b border-black/15 pb-2">
                <h2 className="text-headline-sm font-bold uppercase text-on-surface">
                    [ 01_ROLE_SPECIFICATION // SELECT_PERSONA ]
                </h2>
                <p className="text-body-sm text-secondary">
                    Configure your operational mandate to initialize the appropriate telemetry dashboard.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <RoleCard
                    role="student"
                    title="Student / Candidate"
                    code="SPEC: CANDIDATE_NODE"
                    description="Verify empirical engineering capabilities, pass anti-cheat proctoring, and match with open technical roles."
                    specifications={[
                        "AI Verified Skill Score",
                        "Live Hardware Proctoring",
                        "TF-IDF Algorithmic Matching",
                        "Adaptive Deficit Learning"
                    ]}
                    selectRole={setRole}
                    selected={role === 'student'}
                />

                <RoleCard
                    role="client"
                    title="Recruiter / Enterprise"
                    code="SPEC: ENTERPRISE_NODE"
                    description="Publish job requisitions, rank candidates by TF-IDF cosine similarity, and audit tamper-proof proctor telemetry."
                    specifications={[
                        "Deploy Job Requisitions",
                        "Cosine Similarity Matcher",
                        "Audit Proctor Risk Logs",
                        "Instant Cryptographic Offers"
                    ]}
                    selectRole={setRole}
                    selected={role === 'client'}
                />
            </div>
        </div>
    );
};

export default Step1Role;
