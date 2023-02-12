import { Link } from "react-router-dom";
import DeleteHonorsItemModal from "../DeleteHonorsItemModal";
import EditHonorsItemModal from "../EditHonorsItemModal";
import deleteIcon from "../images/event-delete-icon.svg";
import editIcon from "../images/event-edit-icon.svg";
import "./HonorDoc.scss";
import { blankLinks, parseDescription } from "../utils";

export const HonorDoc = ({
  currentUser,
  doc,
  fetchDocuments,
  selectedDocument,
  editHonorIsOpen,
  setEditHonorIsOpen,
  selectEditModal,
  selectDeleteModal,
  documents,
  setDocuments,
  deleteHonorIsOpen,
  setDeleteHonorIsOpen,
}) => (console.log({doc}),
  <div className={"honor-doc"}>
    <div className="honor-doc-outer">
      <div className="honor-doc-inner">
        {doc.file.endsWith(".pdf") ? (
          <div className="honor-doc-media-container">
            <embed
              className="honor-doc-media media-embed"
              src={doc.file}
              target={"_parent"}
            />
          </div>
        ) : (
          <div className="honor-doc-media-container media-image" style={{ color: 'red', backgroundImage: `url(${doc.file})` }} />
        )}

        {(currentUser?.admin === true || currentUser?.user?.admin === true) && (
          <div className="honor-doc-controls">
            {/* This will delete a document in the Honors Page */}
            <button
              className="honor-doc-control"
              type="button"
              onClick={() => selectDeleteModal(doc)}
            >
              <img src={deleteIcon} />
            </button>

            {/* This will edit a document in the Honors Page */}
            <button
              className="honor-doc-control"
              type="button"
              onClick={() => selectEditModal(doc)}><img src={editIcon} /></button>
          </div>
        )}

        <div class="honor-doc-infos">
          <div class="honor-doc-infos-inner">
            <p
              dangerouslySetInnerHTML={{
                __html: parseDescription(doc.description),
              }}
            ></p>
          </div>
          <div className="honor-doc-infos-click-to-open">
            <a
              href={doc.file}
              target="_blank"
              className="honor-doc-infos-click-to-open-image"
              >
              Click to view image
            </a>
            <a className="honor-doc-infos-click-to-open-document" href={`/honor_view_item/${doc.id}`} target="_blank">
              View full document in another page
            </a>
          </div>
        </div>
      </div>
    </div>
    {(currentUser?.admin === true || currentUser?.user?.admin === true) && (
      <>
        <EditHonorsItemModal
          fetchDocuments={fetchDocuments}
          setDocuments={setDocuments}
          selectedDocument={selectedDocument}
          doc={doc}
          editHonorIsOpen={editHonorIsOpen}
          setEditHonorIsOpen={setEditHonorIsOpen}
        />
        <DeleteHonorsItemModal
          selectedDocument={selectedDocument}
          doc={doc}
          documents={documents}
          setDocuments={setDocuments}
          deleteHonorIsOpen={deleteHonorIsOpen}
          setDeleteHonorIsOpen={setDeleteHonorIsOpen}
        />
      </>
    )}
  </div>
);
