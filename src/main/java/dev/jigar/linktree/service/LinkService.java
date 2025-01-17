package dev.jigar.linktree.service;

import dev.jigar.linktree.dto.LinkRequestDTO;
import dev.jigar.linktree.dto.LinkResponseDTO;
import dev.jigar.linktree.entity.Link;
import dev.jigar.linktree.entity.Profile;
import dev.jigar.linktree.repository.LinkRepository;
import dev.jigar.linktree.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class LinkService {

    @Autowired
    private LinkRepository linkRepository;

    @Autowired
    private ProfileRepository profileRepository;

    public List<LinkResponseDTO> getLinksByProfileSorted(UUID profileId) {
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        List<Link> links = linkRepository.findByProfileOrderByPositionAsc(profile);
        return links.stream()
                .map(LinkResponseDTO::new)
                .collect(Collectors.toList());
    }

    public LinkResponseDTO createLink(LinkRequestDTO requestDTO) {
        // We assume the requestDTO contains a profileId
        UUID profileId = requestDTO.getProfileId();
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        // Determine the next position (max+1) or set to requestDTO.getPosition() if provided
        int maxPosition = linkRepository.findByProfileOrderByPositionAsc(profile)
                .stream()
                .mapToInt(Link::getPosition)
                .max()
                .orElse(0);

        Link link = new Link();
        link.setProfile(profile);
        link.setTitle(requestDTO.getTitle());
        link.setUrl(requestDTO.getUrl());
        link.setIsVisible(requestDTO.getIsVisible() != null ? requestDTO.getIsVisible() : true);
        link.setPosition(requestDTO.getPosition() != null ? requestDTO.getPosition() : maxPosition + 1);
        link.setThumbnail(requestDTO.getThumbnail());
        link.setCreatedAt(LocalDateTime.now());
        link.setUpdatedAt(LocalDateTime.now());

        Link saved = linkRepository.save(link);
        return new LinkResponseDTO(saved);
    }

    public LinkResponseDTO updateLink(UUID linkId, LinkRequestDTO requestDTO) {
        Link link = linkRepository.findById(linkId)
                .orElseThrow(() -> new RuntimeException("Link not found"));

        if (requestDTO.getTitle() != null) {
            link.setTitle(requestDTO.getTitle());
        }
        if (requestDTO.getUrl() != null) {
            link.setUrl(requestDTO.getUrl());
        }
        if (requestDTO.getPosition() != null) {
            link.setPosition(requestDTO.getPosition());
        }
        if (requestDTO.getIsVisible() != null) {
            link.setIsVisible(requestDTO.getIsVisible());
        }
        if (requestDTO.getThumbnail() != null) {
            link.setThumbnail(requestDTO.getThumbnail());
        }

        link.setUpdatedAt(LocalDateTime.now());
        Link updated = linkRepository.save(link);
        return new LinkResponseDTO(updated);
    }

    public void deleteLink(UUID linkId) {
        linkRepository.deleteById(linkId);
    }

    public LinkResponseDTO getLink(UUID linkId) {
        Link link = linkRepository.findById(linkId)
                .orElseThrow(() -> new RuntimeException("Link not found"));
        return new LinkResponseDTO(link);
    }

    public void updateLinkPositions(UUID profileId, List<UUID> linkOrder) {
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        // For each link ID in linkOrder, set position = index + 1
        for (int i = 0; i < linkOrder.size(); i++) {
            UUID linkId = linkOrder.get(i);
            Link link = linkRepository.findById(linkId)
                    .orElseThrow(() -> new RuntimeException("Link not found: " + linkId));

            // (Optionally) ensure the link belongs to that profile
            if (!link.getProfile().getId().equals(profile.getId())) {
                throw new RuntimeException("Link " + linkId + " does not belong to profile " + profileId);
            }

            link.setPosition(i + 1); // or i if you want 0-based
            link.setUpdatedAt(LocalDateTime.now());
            linkRepository.save(link);
        }
    }
}
