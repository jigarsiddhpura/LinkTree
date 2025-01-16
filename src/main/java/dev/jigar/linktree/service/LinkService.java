package dev.jigar.linktree.service;

import dev.jigar.linktree.entity.Link;
import dev.jigar.linktree.entity.Profile;
import dev.jigar.linktree.repository.LinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LinkService {

    @Autowired
    private LinkRepository linkRepository;

    public Link createLink(Profile profile, Link link) {
        link.setProfile(profile);
        return linkRepository.save(link);
    }

    public Link updateLink(UUID linkId, Link updatedLink) {
        return linkRepository.findById(linkId)
                .map(existing -> {
                    existing.setTitle(updatedLink.getTitle());
                    existing.setUrl(updatedLink.getUrl());
                    existing.setIcon(updatedLink.getIcon());
                    existing.setPosition(updatedLink.getPosition());
                    existing.setIsVisible(updatedLink.getIsVisible());
                    existing.setCustomStyles(updatedLink.getCustomStyles());
                    // Update updatedAt etc. if needed
                    return linkRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Link not found"));
    }

    public void deleteLink(UUID linkId) {
        linkRepository.deleteById(linkId);
    }

    public List<Link> getLinksByProfile(Profile profile) {
        return linkRepository.findByProfileOrderByPositionAsc(profile);
    }
}
