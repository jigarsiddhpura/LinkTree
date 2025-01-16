package dev.jigar.linktree.service;

import dev.jigar.linktree.entity.CustomDomain;
import dev.jigar.linktree.entity.Profile;
import dev.jigar.linktree.repository.CustomDomainRepository;
import dev.jigar.linktree.service.CustomDomainService;
import dev.jigar.linktree.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class CustomDomainService {

    @Autowired
    private CustomDomainRepository customDomainRepository;

    @Autowired
    private ProfileService profileService;

    public CustomDomain addCustomDomain(UUID profileId, String domainName) {
        Profile profile = profileService.getProfileById(profileId);

        CustomDomain domain = new CustomDomain();
        domain.setProfile(profile);
        domain.setDomainName(domainName);
        domain.setSslStatus(CustomDomain.SslStatus.pending);
        domain.setIsVerified(false);
        domain.setCreatedAt(LocalDateTime.now());
        domain.setUpdatedAt(LocalDateTime.now());

        return customDomainRepository.save(domain);
    }

}
